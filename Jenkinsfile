pipeline {
    agent any 
    stages { 
        stage('SCM Checkout') {
            steps{
            git 'https://github.com/shivrajtikundi/jenkintest1.git'
            }
        }

        stage('Build docker image') {
            steps {  
                sh 'docker build -t ui:$BUILD_NUMBER .'
            }
        }
    }
}
