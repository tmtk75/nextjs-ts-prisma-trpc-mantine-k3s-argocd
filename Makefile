tag := latest

helo:
	@echo

update:
	docker build -t foo-app:$(tag) .
	docker tag foo-app:$(tag) registry.local:5000/foo-app:$(tag)
	docker push registry.local:5000/foo-app:$(tag)

argocd-pf:
	kubectl port-forward svc/argocd-server -n argocd 8080:443

restart:
	kubectl rollout restart deployment foo-app

