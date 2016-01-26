searchSchema = new db.Schema({
	Date		: { type: Date, default: Date.now },
	CompanyName	: String,
	Name		: String,
	Email		: String,
	Title		: String,
	Telephone	: String,
	Employees 	: String,
	Lower 		: String,
	Upper 		: String,
	IClink 		: String
})

