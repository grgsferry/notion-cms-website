require("dotenv").config();

const express = require("express");
const app = express();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

app.set("view engine", "ejs");
app.use(express.static("public"));

async function getProjectsData() {
  const arr = [];
  const databaseId = "56907ac77ba44ac5a7948d3de1007469";
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Year",
        direction: "ascending",
      },
    ],
  });
  for (let i = 0; i < response.results.length; i++) {
    arr.push({
      pageId: response.results[i].id,
      year: response.results[i].properties.Year.date.start,
      name: response.results[i].properties.Name.title[0].plain_text,
      details: response.results[i].properties.Details.rich_text[0].plain_text,
    });
  }
  return arr;
}

async function getExperiencesData() {
  const arr = [];
  const databaseId = "f215bd7db0e84bc0989b14afb37e93f4";
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "EndYear",
        direction: "descending",
      },
    ],
  });
  for (let i = 0; i < response.results.length; i++) {
    arr.push({
      pageId: response.results[i].id,
      jobTitle: response.results[i].properties.JobTitle.title[0].plain_text,
      company: response.results[i].properties.Company.rich_text[0].plain_text,
      startYear: response.results[i].properties.StartYear.rich_text[0].plain_text,
      endYear: response.results[i].properties.EndYear.rich_text[0].plain_text,
    });
  }
  return arr;
}

async function getEducationsData() {
  const arr = [];
  const databaseId = "ff66d213bc0d4969b734eda4fa9f72e3";
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "EndYear",
        direction: "descending",
      },
    ],
  });
  for (let i = 0; i < response.results.length; i++) {
    arr.push({
      pageId: response.results[i].id,
      major: response.results[i].properties.Major.title[0].plain_text,
      company: response.results[i].properties.Institution.rich_text[0].plain_text,
      startYear: response.results[i].properties.StartYear.rich_text[0].plain_text,
      endYear: response.results[i].properties.EndYear.rich_text[0].plain_text,
      details: response.results[i].properties.Details.rich_text[0].plain_text,
    });
  }
  return arr;
}

async function getSkillsData() {
  const arr = [];
  const databaseId = "fc21d146a229437b88e126834b58ef4e";
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  for (let i = 0; i < response.results.length; i++) {
    arr.push({
      pageId: response.results[i].id,
      name: response.results[i].properties.Name.title[0].plain_text,
      details: response.results[i].properties.Details.rich_text[0].plain_text,
    });
  }
  console.log(arr);
  return arr;
}

async function getStacksData() {
  const arr = [];
  const databaseId = "09935d7f777c45b5aff0f6e0f4a52b44";
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  for (let i = 0; i < response.results.length; i++) {
    arr.push({
      pageId: response.results[i].id,
      name: response.results[i].properties.Name.title[0].plain_text,
      details: response.results[i].properties.Details.rich_text[0].plain_text,
    });
  }
  console.log(arr);
  return arr;
}

app.get("/", async function (req, res) {
  try {
    const projectsData = await getProjectsData();
    const experiencesData = await getExperiencesData();
    const educationsData = await getEducationsData();
    const skillsData = await getSkillsData();
    const stacksData = await getStacksData();

    res.render("index", { projectsData, experiencesData, educationsData, skillsData, stacksData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("App is listening on port localhost:3000.");
});
