export function formatRankedCompetitors(inputString: string): string {
  if (!inputString || inputString.trim() === "") {
    return "$$"; 
  }

  const allNames: string[] = [];
  const allWebsites: string[] = [];

  const pairs = inputString.split(',');

  for (const pair of pairs) {
    const trimmedPair = pair.trim();
    const firstColonIndex = trimmedPair.indexOf(':');

    if (firstColonIndex > -1 && firstColonIndex < trimmedPair.length - 1) {
      const key = trimmedPair.substring(0, firstColonIndex).trim();
      const value = trimmedPair.substring(firstColonIndex + 1).trim();

      if (key === "name") {
        allNames.push(value);
      } else if (key === "website") {
        allWebsites.push(value);
      }
    }
  }

  const namesStr = allNames.join('~');
  const websitesStr = allWebsites.join('~');

  return `${namesStr}$$${websitesStr}`;
}