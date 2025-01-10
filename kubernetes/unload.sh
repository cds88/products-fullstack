kubectl delete -f configmap.yaml
kubectl delete -f deployment-products-frontend.yaml
kubectl delete -f deployment-products-next.yaml
kubectl delete -f deployment-products-api.yaml
kubectl delete -f service-products-api.yaml
kubectl delete -f deployment-products-postgres.yaml
kubectl delete -f service-products.yaml
kubectl delete -f ingress-products.yaml

kubectl delete pvc --all
kubectl delete pv --all
