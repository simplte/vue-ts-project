import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todoList: [
			{
				text: '学习ts',
				complete: false
			},
			{
				text: '学习node',
				complete: false
			},
			{
				text: '学习',
				complete: false
			}
		]
	},
	mutations: {
		updateList(state, { index, conent }) {
			state.todoList[index].text = conent;
		},
		todoComplete(state, index) {
			state.todoList[index].complete = !state.todoList[index].complete;
		}
	},
	actions: {},
	modules: {}
});
