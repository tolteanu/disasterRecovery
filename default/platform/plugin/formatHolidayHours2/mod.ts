export function formatOperatingHours(inputString: string): string {
  let processString = inputString;

  const mondayIndex = inputString.indexOf(',monday:');

  if (mondayIndex !== -1) {
    processString = inputString.substring(0, mondayIndex);
  }

  const segments = processString.split(/,(?=date:)/);
  const formattedParts: string[] = [];
  const intervalRegex = /(?:openIntervals:|,)end:(\d{2}:\d{2}),start:(\d{2}:\d{2})/g;

  for (const segment of segments) {
    const dateMatch = segment.match(/date:(\d{4}-\d{2}-\d{2})/);
    if (!dateMatch) continue;
    const date = dateMatch[1];

    let outputData = '';

    if (segment.includes(',isRegularHours:true')) {
      outputData = '';
    } else if (segment.includes(',isClosed:true')) {
      outputData = 'Closed';
    } else {
      const intervals: string[] = [];
      let match;
      while ((match = intervalRegex.exec(segment)) !== null) {
        intervals.push(`${match[2]}-${match[1]}`);
      }
      outputData = intervals.join(',');
    }

    if (outputData) {
      formattedParts.push(`${date}: ${outputData}`);
    }
  }

  return formattedParts.join(' $ ');
}