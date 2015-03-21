#include "list.h"

int main(){
	char input[100];
	FILE* fp = NULL;
	while(fp == NULL){
		printf("Please enter the name of a text file: ");
		scanf("%s", input);
		printf("%s", input);
		fp = fopen(input, "r"); //open the file
	}
	int number;
	while(feof(fp)==0){ //not at the end of the file
		fscanf(fp, "%d", &number);
		add(number);
		//printf("%d ", number);
	}
	fclose(fp); //closing the file pointer
	prettyPrint();
	return 0;
}