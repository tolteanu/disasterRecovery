export function ServiceArea(inputString: string): string {
  if (!inputString || inputString.trim() === "") {
    return "";
  }

  const allGooglePlaceIds: string[] = [];
  const allNames: string[] = [];
  const allTypes: string[] = [];

  const fieldSplitRegex = /,(?=(?:googlePlaceId|name|type):)/;
  const individualFields = inputString.split(fieldSplitRegex);

  for (const field of individualFields) {
    const firstColonIndex = field.indexOf(':');
    if (firstColonIndex > -1) {
      const keyIdentifier = field.substring(0, firstColonIndex);
      const value = field.substring(firstColonIndex + 1).trim(); 

      switch (keyIdentifier) {
        case "googlePlaceId":
          allGooglePlaceIds.unshift(value);
          break;
        case "name":
          allNames.unshift(value);
          break;
        case "type":
          allTypes.unshift(value);
          break;
      }
    }
  }

  const googlePlaceIdsStr = allGooglePlaceIds.join('~');
  const namesStr = allNames.join('~');
  const typesStr = allTypes.join('~');

  return [googlePlaceIdsStr, namesStr, typesStr].join('$$');
}
