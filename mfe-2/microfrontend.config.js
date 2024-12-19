module.exports = {
  name: "mfe_2",
  port: 4010,
  exposes: {
    "./button": "./src/button.tsx",
  },
  shared: {
    react: { eager: true, singleton: true },
    "react-dom": { eager: true, singleton: true },
    microfrontend: { singleton: true },
  },
};
