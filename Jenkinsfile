pipeline {
    environment {
    agent any

    tools {
        nodejs "node"
    }

    stages {
         stage('Install Packages') {
            steps {
                echo "Starting to install npm package"
                sh 'npm install'
                echo "Finished to install npm package"
            }
         }
         stage('Run Unit Test Cases') {
             steps {
                 echo "Starting Unit test cases"
                 sh "npm run test"
                 echo "Finished unit test cases"
             }
         } 
    }   
  
 
