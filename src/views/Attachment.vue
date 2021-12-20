<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col sm="12" cols="12" class="pr-5">
					<div class="attachment" style="background-color: #fff; padding: 20px 20px;">
						<v-row>
							<v-col sm="4" cols="12">
								<h3>{{$t('transactions')}}</h3>
								<v-col class="block" sm="12" cols="12">
									<h2>
										0.00
										<span>GB</span>
									</h2>
									<h2>
										<span>of</span> 0 Transaction
									</h2>
								</v-col>
							</v-col>
							<v-col sm="4" cols="12">
								<h3>Contacts/Items</h3>
								<v-col class="block" sm="12" cols="12">
									<h2>
										0.00
										<span>GB</span>
									</h2>
									<h2>
										<span>of</span> 1 Contact/Items
									</h2>
								</v-col>
							</v-col>
							<v-col sm="4" cols="12">
								<h3>Total Attachment</h3>
								<v-col class="block" sm="12" cols="12">
									<h2>
										0.00
										<span>GB</span>
									</h2>
									<br />
									<h2>
										Use of 1.00
										<span>GB</span>
									</h2>
								</v-col>
							</v-col>
						</v-row>

						<v-row>
							<v-col sm="12" cols="12">
								<template>
									<v-simple-table fixed-header height="300px">
										<template v-slot:default>
											<thead>
												<tr>
													<th class="text-center">File Name</th>
													<th class="text-center">Description</th>
													<th class="text-center">Size</th>
													<th class="text-center">Attach</th>
													<th class="text-center">Date</th>
													<th class="text-center">Action</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in desserts" :key="item.name">
													<td>{{ item.name }}</td>
													<td>{{ item.desc }}</td>
													<td>{{ item.size }}</td>
													<td>{{ item.attach }}</td>
													<td>{{ item.date }}</td>
													<td>{{ item.action }}</td>
												</tr>
											</tbody>
										</template>
									</v-simple-table>
								</template>
							</v-col>
						</v-row>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
export default {
	name: "Search",
	components: {},
	data: () => ({
		desserts: [
			{
				name: "Frozen Yogurt",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Ice cream sandwich",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Eclair",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Cupcake",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Gingerbread",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Jelly bean",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Lollipop",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Honeycomb",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "Donut",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			},
			{
				name: "KitKat",
				desc: 159,
				size: "",
				attach: "",
				date: "",
				action: ""
			}
		]
	}),
	methods: {
		clickMe(data) {
			this.$route.push(data.link);
		}
	}
};
</script>
<style scoped>
.attachment h3 {
	text-align: center;
	margin-bottom: 10px;
	text-transform: uppercase;
}
.attachment .block {
	border: 1px solid #333;
	padding: 15px;
	text-align: center;
}
.attachment .block h2 {
	margin-bottom: 0;
}
.attachment .block h2 span {
	font-size: 14px;
	font-weight: 500;
}
</style>
	