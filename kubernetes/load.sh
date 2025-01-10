kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f configmap.yaml
kubectl apply -f deployment-products-frontend.yaml
kubectl apply -f deployment-products-next.yaml
kubectl apply -f deployment-products-api.yaml
kubectl apply -f service-products-api.yaml
kubectl apply -f deployment-products-postgres.yaml
kubectl apply -f service-products.yaml
kubectl apply -f ingress-products.yaml
