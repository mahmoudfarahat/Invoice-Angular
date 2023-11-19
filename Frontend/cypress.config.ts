import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  videoCompression:true,
  screenshotOnRunFailure:true,
  e2e: {
    baseUrl:'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task',{
        seedDatabase(filename){
          //Run Your NodeJs Code
return filename
        }
      });
    },
  },
});
