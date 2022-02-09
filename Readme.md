<div class="TaskDescription__TaskContentWrapper-sc-7m9k5q-2 bOOgkH task-description-content"><h3>Requirements</h3>
<p>Your task is to implement a NodeJS server that exposes one single endpoint which is meant to run asynchronous
tasks. More precisely, the server has to accept the following requests:</p>
<pre><code class="language-markdown">POST /api/runTasks
</code></pre>
<p>and the request's payload is a JSON-formatted object; for example:</p>
<pre><code class="language-json">{
  "taskIds": ["id422", "id2444", "id424", "id4242"]
}
</code></pre>
<p>The array consists of IDs of the tasks that need to be run.</p>
<p>You will be provided with a <code>TaskRunner</code> service which has the following methods:</p>
<pre><code class="language-markdown">runTask(id: string): Promise&lt;undefined&gt;
hasTask(id: string): boolean
</code></pre>
<p>The <code>runTask</code> method is asynchronous and returns a promise which might resolve after a random period of time.
A request to the endpoint should initiate the execution of all tasks <strong>at the same time</strong>, so that they can
work in parallel, and should return a response as soon as all tasks have been finished. It is supposed to
return an array that has the same length as the <code>taskIds</code> array and that represents the order in which
the tasks have finished in the following way:</p>
<ul>
<li>The <code>i</code>-th item of the array equals <code>i</code> if all tasks from the <code>taskIds</code> array with a lower index than <code>i</code>
had been completed before the <code>i</code>-th task was completed – in other words, when the <code>0</code>th, <code>1</code>st, <code>2</code>nd,
..., <code>(i - 1)</code>-th tasks finished before the <code>i</code>-th task was finished;</li>
<li>otherwise, the <code>i</code>-th item should equal <code>-1</code>.</li>
</ul>
<p>The endpoint should return status code <strong>400</strong> if <code>taskIds</code> contains at least one ID of a task that is not
registered in <code>TaskRunner</code> (you can check this by using the <code>hasTask</code> method). If such a case occurs, you must
make sure that none of tasks has been run. If you happen to execute <code>TaskRunner.runTask</code> on a ID of a task
that is not recognized, the promise that is returned by the method will be rejected.</p>
<h3>Assumptions:</h3>
<ul>
<li>The maximum value of the <code>taskIds</code> array's length is <strong>200</strong>.</li>
<li>You may expect at least <strong>1</strong> task ID to be sent in the request's payload.</li>
<li>Only one import is allowed: <code>express</code> (v4.17.1).</li>
</ul>
<h3>Examples</h3>
<h4>Example 1</h4>
<p>Let's assume that a request with <strong>four</strong> task IDs was sent. <strong>All</strong> task IDs are recognizable by <code>TaskRunner</code>.
The execution order of the given task was: <strong>0</strong>, <strong>2</strong>, <strong>1</strong>, <strong>3</strong>, which means that:</p>
<ul>
<li>the first completed task was the task with the first task ID from the <code>taskIds</code> array;</li>
<li>the second completed task was the task with the third task ID from the array;</li>
<li>the third completed task was the task with the second task ID from the array;</li>
<li>the last completed task was the task with the last task ID from the array.</li>
</ul>
<p>Thus, the response should have status code <strong>200</strong> and the body should be an array:</p>
<pre><code class="language-json">[0, 1, -1, 3]
</code></pre>
<h4>Example 2</h4>
<p>Let's make the same assumptions as in the first example apart from the execution order, which in this case
is: <strong>0</strong>, <strong>1</strong>, <strong>2</strong>, <strong>3</strong>. The response body should be an array:</p>
<pre><code class="language-json">[0, 1, 2, 3]
</code></pre>
<h4>Example 3</h4>
<p>Analogously, if the execution order is <strong>3</strong>, <strong>2</strong>, <strong>1</strong>, <strong>0</strong>, then the response body should be:</p>
<pre><code class="language-json">[0, -1, -1, -1]
</code></pre>
<h4>Example 4</h4>
<p>If the execution order is <strong>2</strong>, <strong>0</strong>, <strong>3</strong>, <strong>1</strong>, <strong>5</strong>, <strong>4</strong>, then the response body should be:</p>
<pre><code class="language-json">[0, -1, 2, -1, 4, -1]
</code></pre>
<h4>Example 5</h4>
<p>On the other hand, when <strong>four</strong> task IDs are provided in a request and one of them has not been registered
in the <code>TaskRunner</code> service, then the response should have status code <strong>400</strong> and <strong>no task should have been run</strong>.</p></div>
