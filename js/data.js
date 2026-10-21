window.PRIMAX_ROLES = [
  {
    id: "vp-product-strategy",
    title: "Vice President, Product Strategy",
    level: "VP / Senior VP",
    industry: "Technology",
    function: "Product",
    workType: "Hybrid",
    summary: "Lead product direction, align teams around strategy, and use customer insight to shape priorities.",
    description: "Set product direction and priorities, align product, design, and engineering teams, and use customer insight to guide product decisions.",
    responsibilities: ["Set product direction and priorities", "Align product, design, and engineering teams", "Use customer insight to guide product decisions"],
    requirements: ["Senior product leadership experience", "Experience leading cross-functional teams", "Strong communication and strategic planning skills"]
  },
  {
    id: "finance-director",
    title: "Director of Finance",
    level: "Director / Senior Director",
    industry: "Finance",
    function: "Finance & Strategy",
    workType: "On-site",
    summary: "Guide financial planning, reporting, and performance decisions in a fast-moving leadership environment.",
    description: "Lead financial planning and reporting, support business leaders with financial analysis, and improve budgeting and forecasting processes.",
    responsibilities: ["Lead financial planning and reporting", "Support business leaders with financial analysis", "Improve budgeting and forecasting processes"],
    requirements: ["Finance leadership experience", "Strong financial reporting and analysis skills", "Experience partnering with senior stakeholders"]
  },
  {
    id: "operations-director",
    title: "Director of Operations",
    level: "Director / Senior Director",
    industry: "Operations & Supply Chain",
    function: "Operations",
    workType: "Hybrid",
    summary: "Drive operational performance, improve execution, and support teams across the delivery model.",
    description: "Coordinate operational planning, review processes for improvement, and work with teams to meet service and delivery goals.",
    responsibilities: ["Coordinate operational planning", "Review processes and identify improvements", "Work with teams to meet service and delivery goals"],
    requirements: ["Operations management experience", "Experience improving business processes", "Clear communication and team leadership skills"]
  },
  {
    id: "people-director",
    title: "People and Culture Director",
    level: "Director / Senior Director",
    industry: "People & Culture",
    function: "Human Resources",
    workType: "Remote",
    summary: "Shape people strategy, leadership development, and employee experience across a growing organisation.",
    description: "Guide people strategy and workforce planning, support leadership development, and strengthen employee experience and people practices.",
    responsibilities: ["Guide people strategy and workforce planning", "Support leadership development", "Strengthen employee experience and people practices"],
    requirements: ["Senior HR or people leadership experience", "Experience supporting organizational change", "Sound judgment and communication skills"]
  },
  {
    id: "commercial-director",
    title: "Commercial Director",
    level: "Director / Senior Director",
    industry: "Commercial",
    function: "Sales & Marketing",
    workType: "Hybrid",
    summary: "Develop commercial priorities, strengthen customer relationships, and support sustainable growth.",
    description: "Develop commercial plans and priorities, build strong customer relationships, and work across teams to support sustainable growth.",
    responsibilities: ["Develop commercial plans and priorities", "Build strong customer relationships", "Work across teams to support sustainable growth"],
    requirements: ["Commercial or sales leadership experience", "Experience developing customer and market strategy", "Strong negotiation and team leadership skills"]
  },
  {
    id: "chief-executive",
    title: "Chief Executive Officer",
    level: "C-Suite",
    industry: "Executive Leadership",
    function: "Executive Leadership",
    workType: "On-site",
    summary: "Lead strategy, governance, and growth decisions with clear executive leadership and stakeholder focus.",
    description: "Set organizational direction and priorities, lead the executive team, and build relationships with key stakeholders.",
    responsibilities: ["Set organizational direction and priorities", "Lead the executive team", "Build relationships with key stakeholders"],
    requirements: ["Executive leadership experience", "Experience guiding strategy and organizational performance", "Strong governance and communication skills"]
  }
];

const practices = ["Executive Leadership", "Technology", "Finance", "Operations", "People & Culture", "Commercial"];
window.PRIMAX_TEAM_PLACEHOLDERS = Array.from({ length: 30 }, function (_, index) {
  return { number: index + 1, name: "Connector profile " + String(index + 1).padStart(2, "0"), title: "Profile placeholder", practice: practices[index % practices.length] };
});
