import  mongoose , { Schema, Document } from 'mongoose';


interface IClientFeedback {
  clientName: string;
  clientImage?: string; 
  clientDesignation: string;
  feedback: string;
}

interface ISolution {
  description: string;
  solutions: string[]; 
}

interface IResult {
  description: string;
  results: string[];
  resultImage?: string; 
}

interface IKeyFeature {
  description: string;
  features: string[];
}

interface ITeam {
  numberOfMembers: number;
  text: string;
}

interface ISprints {
  numberOfSprints: number;
  text: string;
}

interface ITime {
  numberOfMonths: number;
  text: string;
}

export interface IProject extends Document {
  appName: string;
  logo: string;
  thumbImage: string;
  title: string;
  team: ITeam;
  sprints: ISprints;
  time: ITime;
  projectOverview: string;
  coverImage?: string;
  about:string;
  technologies: string[];
  industry: string;
  clientFeedback?: IClientFeedback;
  solution?: ISolution;
  keyFeature: IKeyFeature;
  result: IResult;
}

const ClientFeedbackSchema = new Schema<IClientFeedback>({
  clientName: { type: String, required: true },
  clientImage: { type: String },
  clientDesignation: { type: String, required: true },
  feedback: { type: String, required: true },
}, { _id: false });

const SolutionSchema = new Schema<ISolution>({
  description: { type: String },
  solutions: { type: [String], required: true },
}, { _id: false });

const ResultSchema = new Schema<IResult>({
  description: { type: String },
  results: { type: [String], required: true },
  resultImage: { type: String },
}, { _id: false });

const KeyFeatureSchema = new Schema<IKeyFeature>({
  description: { type: String, required: true },
  features: { type: [String], required: true },
}, { _id: false });

const TeamSchema = new Schema<ITeam>({
  numberOfMembers: { type: Number, required: true },
  text: { type: String, required: true },
}, { _id: false });

const SprintsSchema = new Schema<ISprints>({
  numberOfSprints: { type: Number, required: true },
  text: { type: String, required: true },
}, { _id: false });

const TimeSchema = new Schema<ITime>({
  numberOfMonths: { type: Number, required: true },
  text: { type: String, required: true },
}, { _id: false });

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  appName: { type: String, required: true },
  logo: { type: String, required: true },
  thumbImage: { type: String, required: true },
  projectOverview: { type: String, required: true },
  about: { type: String, required: true },
  coverImage: { type: String },
  clientFeedback: { type: ClientFeedbackSchema },
  solution: { type: SolutionSchema },
  result: { type: ResultSchema, required: true },
  keyFeature: { type: KeyFeatureSchema, required: true },
  team: { type: TeamSchema, required: true },
  sprints: { type: SprintsSchema, required: true },
  time: { type: TimeSchema, required: true },
  technologies: { type: [String], required: true },
  industry: { type: String, required: true },
}, { timestamps: true });


export default mongoose.model<IProject>('Project', ProjectSchema);
