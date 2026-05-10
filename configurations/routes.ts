const routes = [
  {
    path: "/cfp",
    name: "Call for Proposal",
    disabled: false,
  },
  {
    path: "/program",
    name: "Program",
    disabled: true,
  },
  {
    path: "/workshops",
    name: "Workshops",
    disabled: false,
    children: [
      {
        path: "/workshops#laurence-graph",
        name: "突破 SQL 查詢極限：用 Graph 思維處理複雜關聯與多跳推論",
        disabled: false,
      },
      {
        path: "/workshops#jiang-workflow",
        name: "現代流程引擎工作坊：簡化跨服務、多步驟流程開發",
        disabled: false,
      },
    ],
  },
  {
    path: "/projects",
    name: "Projects",
    disabled: true,
    children: [
      {
        path: "/projects#modmesh",
        name: "modmesh",
        disabled: false,
      },
      {
        path: "/projects#python-official-document-translation",
        name: "Python Official Document Translation",
        disabled: false,
      },
      {
        path: "/projects#sciwork-portal",
        name: "sciwork Portal",
        disabled: false,
      },
      {
        path: "/projects#utensor",
        name: "uTensor",
        disabled: false,
      },
      {
        path: "/projects#cytnx",
        name: "Cytnx",
        disabled: false,
      },
    ],
  },
  {
    path: "/sponsor",
    name: "Sponsor",
    disabled: true,
  },
  {
    path: "/venue",
    name: "Venue",
    disabled: true,
  },
  {
    path: "/about",
    name: "Team",
    disabled: true,
  },
  {
    path: "/code-of-conduct",
    name: "Code of conduct",
    disabled: false,
  },
];

export default routes;
