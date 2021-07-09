# snow-stress
Stress tests against Service Now that demonstrates semaphore overload problem and reveals the actual throughput of your Service Now instance for receiving and processing https requests. The time Service Now uses for processing and answering your API request is dependent on the operation being requested, so please use a real life scenario that actually requires that your payload is processed and selects/inserts/updates/deletes of rows in Service Now tables are required.

Instructions:
1. Run the tests on a system with nodejs available
2. Clone the repository
2. Switch to the snow-stress folder
3. Run "npm install" to fetch dependencies - only the request module is required
4. Run "node stress_async.js", "node stress_sync.js" or "node stress_throttled.js" based on your test preference
