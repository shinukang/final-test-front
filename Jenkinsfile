pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "shinukang"
        IMAGE_NAME = "final-test-front"
        IMAGE_TAG = "${BUILD_NUMBER}"
        // 리버스 프록시를 사용하므로 빌드 시점에는 /api 로 설정하면 됨
        BACKEND_API_URL = "/api"
        KUBECONFIG_CREDENTIAL_ID = 'kubeconfig-id'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        // VITE_BACKEND_URL 인자를 사용하여 빌드 시 백엔드 주소 주입
                        def customImage = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}", "--build-arg VITE_BACKEND_URL=${BACKEND_API_URL} -f frontend/Dockerfile frontend/")
                        customImage.push()
                        customImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                withKubeConfig([credentialsId: "${KUBECONFIG_CREDENTIAL_ID}"]) {
                    sh """
                    sed -i "s|shinukang/final-test-front:latest|${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}|g" k8s/frontend-deploy.yaml
                    kubectl apply -f k8s/frontend-deploy.yaml
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
