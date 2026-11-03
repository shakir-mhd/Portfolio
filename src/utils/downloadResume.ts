/**
 * Robust cross-browser Resume PDF Downloader.
 * Fetches the PDF as a Blob to force the browser to trigger a native file download
 * rather than navigating away or opening in an internal PDF reader plugin.
 */
export async function downloadResumePdf(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  const primaryUrl = '/assets/Mohomed_Shakir_Resume.pdf';
  const fallbackUrl = '/Mohomed_Shakir_Resume.pdf';

  try {
    let res = await fetch(primaryUrl);
    if (!res.ok) {
      res = await fetch(fallbackUrl);
    }
    if (!res.ok) throw new Error('File fetch failed');

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Mohomed_Shakir_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  } catch {
    // Ultimate fallback: open in new tab
    window.open(primaryUrl, '_blank', 'noopener,noreferrer');
  }
}
