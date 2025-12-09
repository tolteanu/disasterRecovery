export function groupAppFieldsByType(inputString: string): string {
  if (!inputString || inputString.trim() === "") {
    return "";
  }

  const allAppNames: string[] = [];
  const allAppStoreUrls: string[] = [];
  const allCategories: string[] = [];
  const allQuickLinkUrls: string[] = [];

  const appSegments = inputString.split(/,(?=appName:)/);

  for (const segment of appSegments) {
    const currentAppValues: { appName: string; appStoreUrl: string; category: string; quickLinkUrl: string } = {
      appName: "",
      appStoreUrl: "", 
      category: "",
      quickLinkUrl: ""
    };

    const fieldSplitRegex = /,(?=appName:|appStoreUrl:|category:|quickLinkUrl:)/;
    const individualFields = segment.split(fieldSplitRegex);

    for (const field of individualFields) {
      const firstColonIndex = field.indexOf(':');
      if (firstColonIndex > -1) {
        const keyIdentifier = field.substring(0, firstColonIndex);
        const value = field.substring(firstColonIndex + 1).trim(); 

        switch (keyIdentifier) {
          case "appName":
            currentAppValues.appName = value;
            break;
          case "appStoreUrl":
            currentAppValues.appStoreUrl = value;
            break;
          case "category":
            currentAppValues.category = value;
            break;
          case "quickLinkUrl":
            currentAppValues.quickLinkUrl = value;
            break;
        }
      }
    }
    allAppNames.push(currentAppValues.appName);
    allAppStoreUrls.push(currentAppValues.appStoreUrl);
    allCategories.push(currentAppValues.category);
    allQuickLinkUrls.push(currentAppValues.quickLinkUrl);
  }

  const appNamesStr = allAppNames.join('~');
  const appStoreUrlsStr = allAppStoreUrls.join('~');
  const categoriesStr = allCategories.join('~');
  const quickLinkUrlsStr = allQuickLinkUrls.join('~');

  return [appNamesStr, appStoreUrlsStr, categoriesStr, quickLinkUrlsStr].join('$$');
}
