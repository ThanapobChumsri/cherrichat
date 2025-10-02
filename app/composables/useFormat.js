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
    if (typeof datetime !== "string") return datetime;

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

  return {
    useFormattedTime12h,
    useFormattedDateTime,
    useDisplayMessage,
    useSplitTypeMessage,
    useCleanTextForAudio,
  }
}