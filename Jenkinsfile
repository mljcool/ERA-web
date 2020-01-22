def GIT_COMMIT
pipeline {
    agent any
    stages {
      stage('Prepare') {
        steps {
          bitbucketStatusNotify buildState: "INPROGRESS"
        }
      }
      stage('Build') {
        steps {
          sh 'gcloud components install docker-credential-gcr'
          sh 'docker-credential-gcr configure-docker'
          script {
            GIT_COMMIT = checkout(scm).GIT_COMMIT
            def image = docker.build("us.gcr.io/primavera-188715/casemanagement-ui:${GIT_COMMIT}")
            docker.withRegistry('https://us.gcr.io', 'gcr:Primavera-Dev') {
              image.push()
            }
          }
        }
      }
      stage('Deploy') {
        steps {
          dir('dev-cluster') {
            git branch: 'master',
                url: 'https://bitbucket.org/redwagoninc/dev-cluster.git',
                credentialsId: '5a375781-30e8-4c32-be62-bd64b7ef722f'
            sh "gcloud auth activate-service-account --key-file ${env.GCLOUD_AUTH_FILE}"
            sh "gcloud container clusters get-credentials dev --zone us-east1-d --project primavera-188715"
            sh "kubectl set image deploy/casemanagement-ui-deployment casemanagement-ui=us.gcr.io/primavera-188715/casemanagement-ui:${GIT_COMMIT} --namespace default"
          }
        }
      }
    }
    post {
      success {
        bitbucketStatusNotify buildState: "SUCCESSFUL"
      }
      failure {
        bitbucketStatusNotify buildState: "FAILED"
      }
    }
}
