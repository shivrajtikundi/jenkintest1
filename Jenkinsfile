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
        stage('Build'){
            steps {
                echo "Running job: ${env.JOB_NAME}\nbuild: ${env.BUILD_ID} - ${env.BUILD_URL}\nblue ocean: ${env.RUN_DISPLAY_URL}"
            }
        }
    }
    post {
        failure {
            mail to: 'www.shivrajtikundi12@gmail.com , shivrajtikundi13@gmail.com', from: 'www.shivrajtikundi12@gmail.com',
                subject: "Example Build: ${env.JOB_NAME} - Failed", 
                body: "Job Failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
        }
    }
}
