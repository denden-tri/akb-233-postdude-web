import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import setupEditors from "./editor";

const { updateResponseEditor } = setupEditors();

const responseHeadersContainer = document.querySelector(
  "[data-response-headers]"
);

const responseBodyContainer = document.querySelector(
  "[data-json-response-body]"
);

const responseCookieContainer = document.querySelector(
  "[data-response-cookies]"
);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
const data = params.data; // "some_value"
const headers = params.headers; // "some_value"
const cookies = params.cookies; // "some_value"
if (data) {
  responseHeadersContainer.classList.add("d-none");
  updateResponseEditor(data);
}
if (headers) {
  responseBodyContainer.classList.add("d-none");
  const headerData = headers.split("\n").map((header) => {
    return {
      key: header.slice(0, header.indexOf(":")),
      value: header.slice(header.indexOf(":") + 1),
    };
  });

  updateResponseHeaders(headerData);
}

if (cookies) {
  responseBodyContainer.classList.add("d-none");
  const cookieData = cookies
    .replace(/[\[\]']+/g, "")
    .split(";")
    .map((cookie) => {
      return {
        key: cookie.slice(0, cookie.indexOf("=")),
        value: cookie.slice(cookie.indexOf("=") + 1),
      };
    });
  updateResponseCookies(cookieData);
}

function updateResponseHeaders(headers) {
  Object.entries(headers).forEach((x) => {
    const key = x[1].key;
    const value = x[1].value;
    const keyValRow = document.createElement("div");
    keyValRow.classList.add("row", "row-cols-2");

    const keyElement = document.createElement("div");
    keyElement.classList.add(
      "col",
      "border",
      "border-dark",
      "rounded",
      "d-flex",
      "align-items-center"
    );
    keyElement.textContent = key;

    const valueElement = document.createElement("div");
    valueElement.classList.add(
      "col",
      "border",
      "border-dark",
      "text-break",
      "rounded"
    );
    valueElement.textContent = value;
    if (value) {
      keyValRow.append(keyElement);
      keyValRow.append(valueElement);
    }

    responseHeadersContainer.append(keyValRow);
  });
}

function updateResponseCookies(cookie) {
  console.log(cookie);

  Object.entries(cookie).forEach((x) => {
    const key = x[1].key;
    const value = x[1].value;
    const keyValRow = document.createElement("div");
    keyValRow.classList.add("row", "row-cols-2");

    const keyElement = document.createElement("div");
    keyElement.classList.add(
      "col",
      "border",
      "border-dark",
      "rounded",
      "d-flex",
      "align-items-center"
    );
    keyElement.textContent = key;

    const valueElement = document.createElement("div");
    valueElement.classList.add(
      "col",
      "border",
      "border-dark",
      "text-break",
      "rounded"
    );
    valueElement.textContent = value;
    if (value) {
      keyValRow.append(keyElement);
      keyValRow.append(valueElement);
    }

    responseCookieContainer.append(keyValRow);
  });
}
