const sampleTracking = {
  "SGTC123456": {status:"In Transit", location:"Ghaziabad Hub", eta:"Expected delivery: 06 Sep 2026", detail:"Shipment dispatched and moving toward destination."},
  "SGTC2026001": {status:"Out for Delivery", location:"Meerut Road", eta:"Expected delivery: Today", detail:"Shipment is with the delivery team."},
  "SGTC000001": {status:"Delivered", location:"Destination", eta:"Delivered successfully", detail:"POD update available with the branch."}
};

const trackingForm = document.getElementById("trackingForm");
const result = document.getElementById("trackResult");

trackingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.getElementById("lrNumber").value.trim().toUpperCase();
  const data = sampleTracking[value];

  result.classList.add("show");
  if (data) {
    result.innerHTML = `<b>${data.status}</b><br>${data.location}<br>${data.eta}<br><small>${data.detail}</small>`;
  } else {
    result.innerHTML = `<b>Consignment received</b><br>Number: ${escapeHtml(value)}<br><small>This demo site has no live transport database connected yet. Connect the ERP/API to show real shipment status.</small>`;
  }
});

function escapeHtml(str){
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Transport Enquiry - ${data.get("name")}`);
  const body = encodeURIComponent(
`Name: ${data.get("name")}
Phone: ${data.get("phone")}
Company: ${data.get("company") || "-"}
Requirement: ${data.get("message")}`
  );
  window.location.href = `mailto:info@shivamgoldentransport.com?subject=${subject}&body=${body}`;
  contactStatus.textContent = "Your email app should open with the enquiry ready to send.";
  contactStatus.classList.add("ok");
});

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, {rootMargin:"-40% 0px -50% 0px"});
sections.forEach(s => observer.observe(s));
