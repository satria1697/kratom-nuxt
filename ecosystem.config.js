module.exports = {
  apps: [
    {
      name: 'nuxt-krato',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ],
  deploy: {
    production: {
      user: 'global10',
      // Multi host is possible, just by passing IPs/hostname as an array
      host: ['globalindo-intl.com:80'],
      // Branch
      ref: 'origin/master',
      // Git repository to clone
      repo: 'git@github.com:satria1697/kratom-nuxt.git',
      // Path of the application on target servers
      path: '/home/global10/public_html',
      // Can be used to give options in the format used in the configura-
      // tion file.  This is useful for specifying options for which there
      // is no separate command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: 'StrictHostKeyChecking=no',
      // To prepare the host by installing required software (eg: git)
      // even before the setup process starts
      // can be multiple commands separated by the character ";"
      // or path to a script on your local machine
      'pre-setup': 'apt-get install git',
      // Commands / path to a script on the host machine
      // This will be executed on the host after cloning the repository
      // eg: placing configurations in the shared dir etc
      'post-setup': 'ls -la',
      // Commands to execute locally (on the same machine you deploy things)
      // Can be multiple commands separated by the character ";"
      'pre-deploy-local': "echo 'This is a local executed command'",
      // Commands to be executed on the server after the repo has been cloned
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.json'
      // Environment variables that must be injected in all applications on this env
    }
  }
}
