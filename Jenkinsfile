#!groovy

pipeline {
  agent none
  stages {
    stage('npm install') {
      agent {
        docker {
          image 'node:16'
        }
      }
      steps {
        sh 'npm install --f'
        sh 'npm run build' 
      } 
    }
    stage('Docker Build') {
      agent any
      steps {
        sh 'docker build -t ui .'
      }
    }
  }
}
