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
                // 'docker-hub-credentials' ID를 가진 자격 증명을 사용하여 로그인
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh """
                    echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                    docker build --build-arg VITE_BACKEND_URL=${BACKEND_API_URL} -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -f frontend/Dockerfile frontend/
                    docker tag ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                    """
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
