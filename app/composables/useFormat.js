export const useFormat = () => {
  
  const useFormattedTime12h = (datetime) => {
    const date = new Date(datetime);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Bangkok",
    });
  };

  const useFormattedDateTime = (datetime) => {
    if (typeof datetime !== "string" || datetime === "") return datetime;

    let formatted = new Date(datetime).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return formatted.replace(/\//g, "-");
  }

  const useDisplayMessage = (message) => {
    let output = message.replace(/^[*]|[*]$/g, "");
    output = output.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

    return output;
  }

  const useSplitTypeMessage = (message) => {
    return message.split(/(\*[^*]+\*|"[^"]+")/g).filter(Boolean);
  };

  const useCleanTextForAudio = (message) => {
    return useSplitTypeMessage(message)
      .filter((e) => !/^\*.*\*$/.test(e))
      .join(" ")
      .replaceAll('"', '')
      .replaceAll('<b>', '')
      .replaceAll('</b>', '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const useIsSameDay = (date1, date2) => {
    // date1, date2 input utc+7 thailand timezone
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() === d2.getTime();
  }

  const useCalcDiffDay = (date1, date2) => {
    // date1, date2 input utc+7 thailand timezone
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diffTime = d2 - d1;
    const diffDay = diffTime / (1000 * 60 * 60 * 24);
    return diffDay
  }

  return {
    useFormattedTime12h,
    useFormattedDateTime,
    useDisplayMessage,
    useSplitTypeMessage,
    useCleanTextForAudio,
    useIsSameDay,
    useCalcDiffDay,
  }
}