pipeline {
    agent {
        docker { image 'node:16' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
