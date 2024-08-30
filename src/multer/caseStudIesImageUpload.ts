import { Request } from "express";
import path from "path";
import { IProject } from "../models/casestudyModel";
import upload from "./multerConfig";

// Define the upload fields for the project
export const handleProjectUploads = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "imageSrc", maxCount: 1 },
  { name: "overviewImage", maxCount: 1 },
  { name: "solutionImage", maxCount: 1 },
  { name: "keyFeaturesImage", maxCount: 1 },
  { name: "resultImage", maxCount: 1 },
  { name: "clientImage", maxCount: 1 },
  { name: "heroInfoImages", maxCount: 5 },
  { name: "aboutInfoImages", maxCount: 4 },
]);

const getRelativePath = (filePath: string | undefined) => {
  if (!filePath) return undefined;
  return `/uploads/${path.basename(filePath)}`;
};

export const processFiles = (req: Request, baseData: any): IProject => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[] | undefined;
  };

  return {
    ...baseData,
    logo: files["logo"]
      ? getRelativePath(files["logo"][0].path)
      : baseData.logo,
    imageSrc: files["imageSrc"]
      ? getRelativePath(files["imageSrc"][0].path)
      : baseData.imageSrc,

    details: {
      ...baseData.details,
      overviewImage: files["overviewImage"]
        ? getRelativePath(files["overviewImage"][0].path)
        : baseData.details?.overviewImage,
      clientFeedback: {
        ...baseData.details.clientFeedback,
        clientImage: files["clientImage"]
          ? getRelativePath(files["clientImage"][0].path)
          : baseData.details.clientFeedback?.clientImage,
      },
      solution: {
        ...baseData.details.solution,
        solutionImage: files["solutionImage"]
          ? getRelativePath(files["solutionImage"][0].path)
          : baseData.details.solution?.solutionImage,
        solutionsPoints1: baseData.details.solution.solutionsPoints1,
        solutionsPoints2: baseData.details.solution.solutionsPoints2,
      },
      keyFeature: {
        ...baseData.details.keyFeature,
        keyFeaturesImage: files["keyFeaturesImage"]
          ? getRelativePath(files["keyFeaturesImage"][0].path)
          : baseData.details.keyFeature?.keyFeaturesImage,
        keyFeaturesPoints1: baseData.details.keyFeature.keyFeaturesPoints1,
        keyFeaturesPoints2: baseData.details.keyFeature.keyFeaturesPoints2,
      },
      result: {
        ...baseData.details.result,
        resultImage: files["resultImage"]
          ? getRelativePath(files["resultImage"][0].path)
          : baseData.details.result?.resultImage,
        resultsPoints1: baseData.details.result.resultsPoints1,
        resultsPoints2: baseData.details.result.resultsPoints2,
      },
      heroInfo: baseData.details.heroInfo.map((info: any, index: number) => ({
        ...info,
        icon: files["heroInfoImages"] && files["heroInfoImages"][index]
          ? getRelativePath(files["heroInfoImages"][index].path)
          : info.icon,
      })),
      aboutInfo: baseData.details.aboutInfo.map((info: any, index: number) => ({
        ...info,
        icon: files["aboutInfoImages"] && files["aboutInfoImages"][index]
          ? getRelativePath(files["aboutInfoImages"][index].path)
          : info.icon,
      })),
      overviewParagraphs: baseData.details.overviewParagraphs,
    },
  };
};
