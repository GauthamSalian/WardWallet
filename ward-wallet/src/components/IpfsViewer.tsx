"use client";

import React from "react";
import styles from "./ProjectHistory.module.css";

interface IpfsViewerProps {
  ipfsHash?: string;
}

export function IpfsViewer({ ipfsHash }: IpfsViewerProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [metadata, setMetadata] = React.useState<any>(null);
  const gateway =
    process.env.NEXT_PUBLIC_PINATA_GATEWAY || "https://gateway.pinata.cloud";

  function resolveIpfsUri(uri: string | undefined | null) {
    if (!uri) return null;
    const s = String(uri);
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("ipfs://"))
      return s.replace("ipfs://", `${gateway}/ipfs/`);
    if (s.startsWith("/ipfs/")) return `${gateway}${s}`;
    // assume raw hash
    return `${gateway}/ipfs/${s}`;
  }

  React.useEffect(() => {
    if (!ipfsHash) return;
    setLoading(true);
    setError(null);
    setMetadata(null);

    const url = `${gateway}/ipfs/${ipfsHash}`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok)
          throw new Error(
            `Failed to fetch IPFS: ${res.status} ${res.statusText}`
          );
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const json = await res.json();
          setMetadata(json);
        } else {
          // Not JSON, treat as raw file - set metadata to a simple object with download url
          setMetadata({ _rawUrl: url, _contentType: contentType });
        }
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [ipfsHash]);

  if (!ipfsHash) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Documents & Metadata</h3>
      {loading && <p>Loading documents...</p>}
      {error && (
        <div style={{ color: "red" }}>
          <strong>Error loading IPFS content:</strong>
          <div>{error}</div>
        </div>
      )}

      {metadata && (
        <div className={styles.section}>
          {/* If raw file */}
          {metadata._rawUrl ? (
            <div>
              <div className={styles.label}>File:</div>
              <a
                className={styles.value}
                href={metadata._rawUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download file
              </a>
            </div>
          ) : (
            <div>
              {/* Display description prominently if present */}
              {metadata.description && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div className={styles.label}>Description:</div>
                  <div className={styles.value}>{metadata.description}</div>
                </div>
              )}

              {/* Display other top-level metadata fields (excluding files/image/description) */}
              {Object.entries(metadata).map(([key, value]) => {
                if (
                  [
                    "files",
                    "file",
                    "documents",
                    "image",
                    "description",
                  ].includes(key)
                )
                  return null;
                return (
                  <div key={key} style={{ marginBottom: "0.4rem" }}>
                    <span className={styles.label}>{key}:</span>
                    <span className={styles.value}>
                      {typeof value === "string"
                        ? value
                        : JSON.stringify(value)}
                    </span>
                  </div>
                );
              })}

              {/* If there's an image field */}
              {metadata.image && (
                <div style={{ marginTop: "1rem" }}>
                  <div className={styles.label}>Image:</div>
                  <div>
                    <a
                      href={
                        resolveIpfsUri(
                          typeof metadata.image === "string"
                            ? metadata.image
                            : metadata.image.uri || String(metadata.image)
                        ) || "#"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className={styles.value}
                    >
                      Open image
                    </a>
                  </div>
                </div>
              )}

              {/* If there are files array (Pinata's JSON may include files) */}
              {(metadata.files || metadata.documents || metadata.file) && (
                <div style={{ marginTop: "1rem" }}>
                  <div className={styles.label}>Files:</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {(
                      metadata.files ||
                      metadata.documents ||
                      metadata.file
                    ).map((f: any, idx: number) => {
                      // f could be an object with "uri" or a string hash
                      const rawUri =
                        typeof f === "string"
                          ? f
                          : f.uri || f.ipfs || f.hash || f.path;
                      const fileUrl = resolveIpfsUri(rawUri) || "";
                      return (
                        <a
                          key={idx}
                          className={styles.value}
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download {f.name || `file-${idx + 1}`}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Fallback link to open the IPFS gateway URL */}
      <div style={{ marginTop: "0.5rem" }}>
        <a
          href={`${gateway}/ipfs/${ipfsHash}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in IPFS gateway
        </a>
      </div>
    </div>
  );
}
