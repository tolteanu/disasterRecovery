export function FormatVideos(input: string): string {
  const descriptions: string[] = [];
  const videoUrls: string[] = [];

  const segments = input.split("video:url:");

  if (segments.length <= 1 && !input.startsWith("video:url:")) {
      return "$$";
  }
  
  for (let i = 1; i < segments.length; i++) {
      const currentSegmentPayload = segments[i];
      const urlPlusItsOwnText = currentSegmentPayload.split(',')[0].trim();
      const url = urlPlusItsOwnText.split(' ')[0].trim();
      videoUrls.push(url);

      let descriptionSourceText: string;
      if (i === 1) {
          descriptionSourceText = segments[0].trim();
      } else {
          const previousSegmentPayload = segments[i-1];
          const prevUrlPlusItsOwnText = previousSegmentPayload.split(',')[0].trim();
          
          if (previousSegmentPayload.length > prevUrlPlusItsOwnText.length && 
              previousSegmentPayload.charAt(prevUrlPlusItsOwnText.length) === ',') {
              descriptionSourceText = previousSegmentPayload.substring(prevUrlPlusItsOwnText.length + 1).trim();
          } else {
              descriptionSourceText = "";
          }
      }

      let currentDescription = "";
      if (descriptionSourceText.startsWith("description:")) {
          currentDescription = descriptionSourceText.substring("description:".length).trim();
          if (currentDescription.endsWith(',')) {
              currentDescription = currentDescription.slice(0, -1).trim();
          }
      }
      descriptions.push(currentDescription);
  }

  const descriptionsString = descriptions.join('~');
  const videoUrlsString = videoUrls.join('~');

  return `${descriptionsString}$$${videoUrlsString}`;
}