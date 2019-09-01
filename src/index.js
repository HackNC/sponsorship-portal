import m from "mithril";

let link = (href, text) =>
  m(
    m.route.Link,
    {
      class:
        "block md:w-1/3 text-center text-white dark-blue-bg shadow-lg-light-blue hover:bg-blue-600 font-bold m-2 py-5 md:py-10 px-5 md:py-10",
      href
    },
    text
  );

let Home = {
  view: () =>
    m(
      "div.max-w-full.h-screen.md:max-w-5xl.mx-auto.flex.flex-col.md:justify-around",
      m(
        "div.flex.flex-col.items-center",
        m(
          "div",
          m("h1.header", "HackNC"),
          m("h2.header-slogan", "Sponsorship Information")
        )
      ),
      m(
        "div.flex.flex-col.md:flex-row.justify-between",
        link("/commercial-sponsors", "Commercial Sponsors"),
        link("/non-profit-organizations", "Non-Profit Organizations"),
        link("/education", "Education")
      ),
      m(
        "div.flex.justify-center",
        m(
          m.route.Link,
          {
            class:
              "text-center text-white dark-blue-bg shadow-lg-light-blue hover:bg-blue-600 font-italic m-2 py-2 px-2",
            href: "/in-kind"
          },
          "Click here if you want to make an in kind donation"
        )
      )
    )
};

let mealSponsor = false;
let prizeSponsor = false;
let prizeName = "";
let prizeItem = "";
let prizeValue = "";
let prizeCriteria = "";
let otherSponsor = false;
let otherDescription = "";
let donateAmount = 500;
let mealDay = "20";

let options = {
  0: "Friday Dinner",
  1: "Friday Midnight Snack",
  2: "Saturday Breakfast",
  3: "Saturday Lunch",
  4: "Saturday Dinner",
  5: "Saturday Midnight Snack",
  6: "Sunday Breakfast",
  7: "Sunday Lunch"
};

function createEmailLink() {
  let mailto = "mailto:sponsors@hacknc.com";
  let subject = "HackNC Sponsorship";
  let sponsors = [];
  if (mealSponsor)
    sponsors.push(`We want to sponsor the ${options[mealDay]} meal.`);
  if (prizeSponsor)
    sponsors.push(
      `We want to sponsor the following prize:\n\nPrize Name: ${prizeName}\nPrize Item: ${prizeItem} (${prizeValue})\nPrize Criteria: ${prizeCriteria}`
    );
  if (otherSponsor)
    sponsors.push(
      `We'd like to sponsor based on the following:\n${otherDescription}`
    );
  let sponsorString = sponsors.join("\n\n");
  let body = `Hello HackNC!\n\nOur organization would like to sponsor HackNC 2019.\n\n${sponsorString}`;
  return `${mailto}?` + m.buildQueryString({ subject, body });
}

let NonProfits = {
  view: () =>
    m(
      "div.max-w-full.h-full.md:max-w-5xl.mx-auto.flex.flex-col.items-center.justify-center",
      m(
        "div.p-8.mt-10.light-blue-bg.dark-blue.shadow-lg.flex.flex-col.items-center",
        m(
          "div.flex.flex-col.items-center",
          m("div", m("h1.header.pb-2", "HackNC"))
        ),
        m(
          "p.text-xl.max-w-4xl",
          "We're glad to have you! Select your donation amount and custom sponsorship options below. Then click email to get in contact with us!"
        ),
        m(
          "div.mt-5.w-100.md:w-1/2.flex.justify-center",
          m(
            "form.w-full.shadow-lg.p-5.dark-blue-bg.light-blue",
            m(
              "div.flex.items-center.justify-between.pb-2.mb-2.border-b",
              m("label.text-xl.text-extrabold[for='money']", "Donate"),
              m(
                "div.flex",
                m("p.text-xl.text-extrabold", "$"),
                m(
                  "input.text-xl.text-extrabold.w-20.dark-blue-bg.#money[name='money'][type='text']",
                  {
                    value: donateAmount,
                    oninput: e => (donateAmount = e.target.value)
                  }
                )
              )
            ),
            m(
              "div.flex.flex-col.pb-2.mb-2.border-b",
              m(
                "div.flex.items-center.justify-between",
                m("label.text-xl.text-extrabold[for='meal']", "Sponsor a meal"),
                m("input#meal.ml-3[name='meal'][type='checkbox']", {
                  checked: mealSponsor,
                  onclick: e => (mealSponsor = !mealSponsor)
                })
              ),
              mealSponsor
                ? m(
                    "div.ml-6.mt-1",
                    m("p", "Which meal would you like to sponsor?"),
                    m(
                      "select.my-2.text-black.p-1",
                      {
                        onchange: v => {
                          mealDay = v.target.value;
                        }
                      },
                      m(
                        `option[disabled=disabled]${
                          20 == mealDay ? "[selected=selected]" : ""
                        }`,
                        "Please select one"
                      ),
                      Object.entries(options).map(([key, value]) => {
                        return m(
                          `option[value='${key}']${
                            key == mealDay ? "[selected=selected]" : ""
                          }`,
                          value
                        );
                      })
                    )
                  )
                : null
            ),
            m(
              "div.flex.flex-col.pb-2.mb-2.border-b",
              m(
                "div.flex.items-center.justify-between",
                m(
                  "label.text-xl.text-extrabold[for='prize']",
                  "Sponsor a prize"
                ),
                m("input#prize.ml-3[name='prize'][type='checkbox']", {
                  checked: prizeSponsor,
                  onclick: e => (prizeSponsor = !prizeSponsor)
                })
              ),
              prizeSponsor
                ? m(
                    "div.ml-6.mt-2",
                    m("p.text-md", "Describe the prize you want to sponsor:"),
                    m("p.mt-3", "Prize Name"),
                    m(
                      "input.text-black.p-1.w-5/6[type='text'][placeholder='Best Hack to Save the Environment']",
                      {
                        value: prizeName,
                        oninput: e => (prizeName = e.target.value)
                      }
                    ),
                    m("p.mt-4", "Prize Item"),
                    m(
                      "input.text-black.p-1.w-5/6[type='text'][placeholder='GoPro Hero']",
                      {
                        value: prizeItem,
                        oninput: e => (prizeItem = e.target.value)
                      }
                    ),
                    m("p.mt-4", "Prize Estimated Value"),
                    m(
                      "input.text-black.p-1.w-5/6[type='text'][placeholder='200']",
                      {
                        value: prizeValue,
                        oninput: e => (prizeValue = e.target.value)
                      }
                    ),
                    m("p.mt-4", "Prize Criteria"),
                    m(
                      "textarea.mb-4.text-black.p-1.w-5/6[placeholder='Save the world with new and innovative technology']",
                      {
                        value: prizeCriteria,
                        oninput: e => (prizeCriteria = e.target.value)
                      }
                    )
                  )
                : null
            ),
            m(
              "div.flex.flex-col.pb-2.mb-2.border-b",
              m(
                "div.flex.items-center.justify-between",
                m(
                  "label.text-xl.text-extrabold[for='other']",
                  "Sponsor something else"
                ),
                m("input#other.ml-3[name='other'][type='checkbox']", {
                  checked: otherSponsor,
                  onclick: e => (otherSponsor = !otherSponsor)
                })
              ),
              otherSponsor
                ? m(
                    "div.ml-6.mt-1",
                    m("p", "How would you like to sponsor HackNC?"),
                    m("textarea.mt-1.mb-4.text-black.p-1.w-5/6", {
                      value: otherDescription,
                      oninput: e => (otherDescription = e.target.value)
                    })
                  )
                : null
            ),
            m(
              "div.flex.justify-end.pt-2",
              m(
                "a.text-xl.text-extrabold.dark-blue.light-blue-bg.px-3.py-1.shadow.hover:shadow-xl",
                { href: createEmailLink() },
                "Email"
              )
            )
          )
        )
      )
    )
};

let Commercial = {
  view: () =>
    m(
      "div.max-w-full.h-full.md:max-w-5xl.mx-auto.flex.flex-col.items-center.justify-center",
      m(
        "div.p-8.mt-10.light-blue-bg.dark-blue.shadow-lg.flex.flex-col",
        m(
          "div.flex.flex-col.items-center",
          m("div", m("h1.header.pb-2", "HackNC 2019"))
        ),
        m("p.text-xl.max-w-4xl.mt-2", "Thank you for your interest!"),
        m(
          "p.text-xl.max-w-4xl.mt-2",
          "Our sponsor packet for HackNC 2019 is available here: ",
          m(
            "a.our-orange[href='https://hacknc.com/static/assets/resources/sponsor_packet.pdf']",
            "sponsor information packet"
          )
        ),
        m(
          "p.text-xl.max-w-4xl.mt-2",
          "If you are interested in sponsoring us for next year, please send an email to ",
          m(
            "a.our-orange[href='mailto:sponsors@hacknc.com']",
            "sponsors@hacknc.com"
          )
        )
      )
    )
};

m.route.prefix = "";

m.route(document.body, "/", {
  "/": Home,
  "/non-profit-organizations": NonProfits,
  "/commercial-sponsors": Commercial,
  "/education": NonProfits,
  "/in-kind": Commercial
});
