sh ./clear-test-data.sh
artillery run -e localload -o ./loads-log create-accounts.yml
artillery run -e localload -o ./loads-log login.yml
artillery run -e localload -o ./loads-log dynamic-data.yml