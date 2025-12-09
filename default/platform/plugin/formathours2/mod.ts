export function formatWeeklyHours2(hoursString: string): string {
  const finalValuesInOrder: string[] = [];

  // Split guarantees the fixed order: fri, mon, sat, sun, thu, tue, wed
  const splitRegex = /,(?=(?:monday|saturday|sunday|thursday|tuesday|wednesday):)/;
  const daySegments = hoursString.split(splitRegex);

  // Regex to find end/start pairs
  const timePairRegex = /end:(\d{2}:\d{2}),start:(\d{2}:\d{2})/g;

  for (const segment of daySegments) {
    const trimmedSegment = segment.trim();
    let dayOutputValue: string | null = null;

    if (trimmedSegment.includes(':isClosed:true')) {
      dayOutputValue = "closed";
    } else if (trimmedSegment.includes(':openIntervals:')) {``
      const timePairsFormatted: string[] = [];
      const matches = trimmedSegment.matchAll(timePairRegex);
      for (const match of matches) {
        const endTime = match[1];
        const startTime = match[2];
        timePairsFormatted.push(`${startTime}-${endTime}`);
      }

      if (timePairsFormatted.length > 0) {
        // Join multiple intervals for ONE day with COMMA
        dayOutputValue = timePairsFormatted.join(',');
      } else {
        dayOutputValue = null; // Open day with no intervals
      }
    } else {
      dayOutputValue = null; // Unrecognized format
    }

    // Add the result (or "" if failed) to the list, maintaining order
    if (dayOutputValue !== null) {
      finalValuesInOrder.push(dayOutputValue);
    } else {
      finalValuesInOrder.push("");
    }
  }

  // Join the results for ALL days with SEMICOLON
  return finalValuesInOrder.join(';');
}