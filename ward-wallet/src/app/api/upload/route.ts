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

    // --- Extract metadata (be permissive: accept varied client fields like approvalId/title/etc.) ---
    const titleVal = formData.get("title");
    const descriptionVal = formData.get("description");
    const budgetVal = formData.get("budget");
    const idVal = formData.get("id");
    const approvalIdVal = formData.get("approvalId");

    const title = typeof titleVal === "string" ? titleVal : "";
    const description = typeof descriptionVal === "string" ? descriptionVal : "";
    const budget = typeof budgetVal === "string" ? budgetVal : "";
    const id = typeof idVal === "string" ? idVal : "";
    const approvalId = typeof approvalIdVal === "string" ? approvalIdVal : "";

    // Build keyvalues only for provided metadata (avoid strict failure so clients can send minimal fields)
    const keyvalues: Record<string, string> = {};
    if (title) keyvalues.title = title;
    if (description) keyvalues.description = description;
    if (budget) keyvalues.budget = budget;
    if (id) keyvalues.id = id;
    if (approvalId) keyvalues.approvalId = approvalId;

    // --- Construct FormData for Pinata ---
    // derive a safe filename: prefer id, then approvalId, then title, else timestamp
    const baseName = id || approvalId || title || `file-${Date.now()}`;
    let filename = String(baseName);
    // if the uploaded entry is a File and has a name, prefer that name
    if (fileEntry instanceof File && fileEntry.name) {
      filename = fileEntry.name;
    } else {
      // ensure an extension exists (default to .bin)
      if (!/\.[a-z0-9]+$/i.test(filename)) filename = `${filename}.bin`;
    }

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
