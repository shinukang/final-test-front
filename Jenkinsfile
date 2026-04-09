pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "shinukang"
        IMAGE_NAME = "final-test-front"
        IMAGE_TAG = "${BUILD_NUMBER}"
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
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh """
                    echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                    # 레포지토리 루트에서 frontend 폴더를 타겟팅하여 빌드
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
                    # frontend/k8s 폴더 안의 YAML 파일 수정 및 적용
                    sed -i "s|shinukang/final-test-front:latest|${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}|g" frontend/k8s/frontend-deploy.yaml
                    kubectl apply -f frontend/k8s/frontend-deploy.yaml
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
