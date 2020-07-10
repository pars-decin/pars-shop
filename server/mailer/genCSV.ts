export function genCSV(input: Array<object>, filename: string) {
  // create header for csv file from keys
  let content = Object.keys(input[0]).join(';') + '\n';

  input.forEach((item) => {
    content += Object.values(item).join(';') + '\n';
  });

  return {
    filename: filename,
    content: content,
    contentType: 'text/csv',
  };
}
