async function putVisitor() {
  try {
    const data = await fetch(`${API_ENDPOINT}visitor`, {
      method: "PUT",
    });

    const body = await data.json();

    const { Attributes } = body;
    changeVisitorInnerHTML(Attributes.visitorCount);
  } catch (err) {
    console.log("Error in putVisitor function", err);
  }
}

async function getVisitor() {
  try {
    const data = await fetch(`${API_ENDPOINT}visitor`);
    const body = await data.json();

    const { Items } = body;
    const { visitorCount } = Items[0];
    changeVisitorInnerHTML(visitorCount);
  } catch (e) {
    console.log("Error in main function", e);
  }
}

function changeVisitorInnerHTML(visitorCount = 0) {
  const visitorEl = document.getElementById("visitor");
  visitorEl.innerHTML = visitorCount ? `${visitorCount} visitors` : "";
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    await putVisitor();
    setInterval(async () => {
      await getVisitor();
    }, 2000);
  } catch (e) {
    console.log("Error in main function", e);
  }
});
