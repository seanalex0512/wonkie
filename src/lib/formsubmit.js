// Test email: seanalex0512@gmail.com — change to Hello.wonkie@gmail.com for production.
// First submission triggers a confirmation email — click the link to activate.
export const FORM_EMAIL = "Hello.wonkie@gmail.com";

export function submitForm(email, data) {
  return fetch(`https://formsubmit.co/ajax/${email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Form submission failed");
    return res.json();
  });
}
