module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "padded-blocks": "off",
  },
};
