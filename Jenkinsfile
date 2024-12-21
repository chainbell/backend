pipeline {

    agent any

    stages {

        stage('Phase 1 : Git Clone') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'chainbell-github', url: 'https://github.com/chainbell/backend.git'
                }
            }
        }

        stage ('Phase 2 : copy project to target space') {
            steps {
                sshagent(credentials: ['SSH-credential']){
                    sh "scp -r -O -P 220 /var/jenkins_home/workspace/nest-api/app SGYoon@mylifeis123.synology.me:/volume1/docker/nestapi"
                }
            }
        }

    }
}