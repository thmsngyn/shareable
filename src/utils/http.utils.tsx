export function parseJson(response: any) {
  return response.text().then(function (text: any) {
    return text ? JSON.parse(text) : {};
  });
}
