pipeline {
    agent any 
    stages { 
        stage('remove docker image') {
            steps {  
                sh 'docker rm -f ui'     
            }
        }
        stage('Build docker image') {
            steps{
                sh 'docker build -t ui .'
            }
        }
        stage('deploy docker image') {
            steps{
                sh 'docker run -d -p 3000:80 --name ui ui'
            }
        }
    }
}
