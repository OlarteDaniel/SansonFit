import { Command } from 'commander';

const program = new Command();

program
  .requiredOption('-m, --mode <mode>', 'Server mode (dev or prod)', 'prod') // Modo predeterminado: prod

program.parse();

const options = program.opts(); // Obtener opciones seleccionadas por el usuario

export default options;