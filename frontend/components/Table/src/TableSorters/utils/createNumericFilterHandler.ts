export const createNumericFilterHandler = (
  originalHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "price" || name === "rating") {
      if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
        let sanitizedValue = value;

        if (value.startsWith(".")) {
          sanitizedValue = "0" + value;
        }

        originalHandler({
          ...event,
          target: { name, value: sanitizedValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    } else {
      originalHandler(event);
    }
  };
};
