<template>
    <div id= "payments" class="card">
         <div class ="card-content columns is-multiline is-3" v-if="!$store.state.signedInUser.payments.loading" >
       <div class="card column is-one-third" v-for="payment in payments" :key="payment.paymentId">
           <p class="card-header-title" v-bind:style="headerStyle[payment.status]">{{payment.status}} - {{new Date(payment.formatDueDate).toDateString()}}</p>
           <div class="card-content">
               <p>Amount Due: {{payment.amountDue}}</p>
               <p v-show="payment.transactionDate">Paid On: {{new Date(payment.formatTransactionDate).toDateString()}}</p>
           </div>
       </div>
       </div>
       <b-skeleton size="is-large" :active="$store.state.signedInUser.payments.loading" :count="2"></b-skeleton>
    </div>
</template>

<script>
export default {
    data () {
        return {
            today: null,
            payments: this.$store.state.signedInUser.payments.data,
            headerStyle: {overdue : {backgroundColor: 'red', color: 'white'},
             paid : {backgroundColor: 'green', color: 'white'},
             due : {backgroundColor: 'ghostWhite', color: 'black'}}
        }
    },
    created() {
        this.setStatus();
        this.payments.sort((a, b) => (this.$dayjs(a.dueDate) > this.$dayjs(b.dueDate)) ? 1 : -1)
    },
    methods: {
        setStatus(){
            this.today = this.$dayjs();
            this.today.set('hour', 23);
            this.today.set('minute', 59);
            for(let payment of this.payments){
                let dueDate = this.$dayjs(payment.dueDate + "T23:59:00.000Z");
                payment.formatDueDate = dueDate.toDate();
                let transactionDate = this.$dayjs(payment.transactionDate + "T23:59:00.000Z");
                payment.formatTransactionDate = transactionDate.toDate();
                if(payment.transactionDate){
                    payment.status = 'paid';
                } else if(dueDate.isBefore(this.today)){
                    payment.status = 'overdue';
                } else {
                    payment.status = 'due'
                }
            }
        }
    }
}
</script>