import { NextRequest, NextResponse } from "next/server";

const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const pinataJWT = process.env.PINATA_JWT;
  console.log(pinataJWT)

  if (!pinataJWT || typeof pinataJWT !== "string") {
    console.error("Missing or invalid Pinata JWT");
    return NextResponse.json({ error: "Pinata API key is not set" }, { status: 500 });
  }

  try {
    const formData = await request.formData();

    // --- Type narrowing for file ---
    const fileEntry = formData.get("file");
    if (!(fileEntry instanceof Blob)) {
      return NextResponse.json({ error: "Uploaded file is missing or invalid." }, { status: 400 });
    }

    // --- Extract metadata ---
    const title = formData.get("title");
    const description = formData.get("description");
    const budget = formData.get("budget");
    const id = formData.get("id");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof budget !== "string" ||
      typeof id !== "string"
    ) {
      return NextResponse.json({ error: "Invalid metadata format." }, { status: 400 });
    }

    const keyvalues: Record<string, string> = {
      title,
      description,
      budget,
      id,
    };

    // --- Construct FormData for Pinata ---
    const filename = `${id}.pdf`;
    const pinataFormData = new FormData();
    pinataFormData.append("file", fileEntry, filename);

    pinataFormData.append(
      "pinataMetadata",
      JSON.stringify({
        name: filename,
        keyvalues,
      })
    );

    pinataFormData.append(
      "pinataOptions",
      JSON.stringify({ cidVersion: 1 })
    );

    // --- Send to Pinata ---
    const pinataRes = await fetch(PINATA_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
      body: pinataFormData,
    });

    if (!pinataRes.ok) {
      const errorData = await pinataRes.json();
      console.error("Pinata error response:", errorData);
      throw new Error(`Pinata API Error: ${pinataRes.status} - ${errorData.error?.reason || "Unknown error"}`);
    }

    const pinataData = await pinataRes.json();
    return NextResponse.json({ ipfsHash: pinataData.IpfsHash }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error occurred.";
    console.error("Upload error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
