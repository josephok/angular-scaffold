pipeline {
  agent {
    docker {
      image 'node:10-alpine'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
}