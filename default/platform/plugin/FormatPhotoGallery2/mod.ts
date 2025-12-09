const MAIN_FIELD_CONFIGS = [
  { keyPrefix: "clickthroughUrl:", name: "clickthroughUrl" },
  { keyPrefix: "description:", name: "description" },
  { keyPrefix: "details:", name: "details" },
  { keyPrefix: "image:alternateText:", name: "imageAlternateText" },
  { keyPrefix: "sourceUrl:", name: "sourceUrl" },
];

const OTHER_DELIMITING_KEYS = ["height:", "thumbnails:", "url:", "width:", "image:"];

export function FormatPhotoGallery2(input: string): string {

  const createEmptyItem = (): Record<string, string> => {
      const item: Record<string, string> = {};
      for (const config of MAIN_FIELD_CONFIGS) {
          item[config.name] = "";
      }
      return item;
  };

  const allDelimitingKeyPrefixes = Array.from(new Set([
      ...MAIN_FIELD_CONFIGS.map(f => f.keyPrefix),
      ...OTHER_DELIMITING_KEYS,
  ]));

  const escapedDelimitingKeyPrefixes = allDelimitingKeyPrefixes.map(k =>
      k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  const valueCaptureRegex = new RegExp(
      `(${escapedDelimitingKeyPrefixes.join('|')})([\\s\\S]*?)(?=(?:${escapedDelimitingKeyPrefixes.join('|')})|$)`,
      'g'
  );

  const parsedItemsData: Record<string, string>[] = [];
  let currentItem = createEmptyItem();
  
  const trimmedInput = input.trim();
  
  let match;
  valueCaptureRegex.lastIndex = 0;

  while ((match = valueCaptureRegex.exec(trimmedInput)) !== null) {
      const key = match[1];
      let value = match[2].trim();

      if (value.endsWith(',')) {
          value = value.slice(0, -1).trim();
      }

      const mainFieldSpec = MAIN_FIELD_CONFIGS.find(f => f.keyPrefix === key);
      if (mainFieldSpec) {
          currentItem[mainFieldSpec.name] = value;
      }

      if (key === "sourceUrl:") {
          parsedItemsData.push(currentItem);
          currentItem = createEmptyItem();
      }
  }
  
  const outputSections: string[] = [];
  for (const config of MAIN_FIELD_CONFIGS) {
      const values = parsedItemsData.map(item => item[config.name]);
      outputSections.push(values.join('~'));
  }

  return outputSections.join('$$');
}