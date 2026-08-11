# Security patch provenance

This repo-local build uses the `image-size` 1.2.1 file-path API required by
Metro and reports version `2.0.3-burnt.1` so package auditors recognize that it
is newer than the affected upstream releases. No patched upstream release is
available for either denial-of-service advisory:

- `GHSA-w3rx-r6r6-pgpr`: reject zero-length, truncated, and out-of-bounds ICNS entries.
- `GHSA-5p2g-fcmc-qvqq`: reject ISO BMFF boxes smaller than their eight-byte header.

The checked-in distribution is the upstream 1.2.1 npm package with only those
two parser guards applied. `../../scripts/check-image-size-security.js` covers
both malformed-input cases, while the Expo Android export covers Metro file-path
compatibility.
